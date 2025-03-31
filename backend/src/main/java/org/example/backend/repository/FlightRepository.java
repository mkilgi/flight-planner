package org.example.backend.repository;

import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.example.backend.dto.FlightSearchRequest;
import org.example.backend.model.Flight;
import org.example.backend.model.Ticket;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface FlightRepository extends JpaRepository<Flight, UUID>,
    JpaSpecificationExecutor<Flight> {

  final Logger log = LoggerFactory.getLogger(FlightRepository.class);

  default Page<Flight> searchFlights(FlightSearchRequest request) {
    return findAll(createSpecification(request),
        PageRequest.of(request.getPage(), request.getSize(), Sort.by("departureTime")));
  }

  private Specification<Flight> createSpecification(FlightSearchRequest request) {
    return (root, query, cb) -> {
      List<Predicate> predicates = new ArrayList<>();

      if (request.getOrigin() != null) {
        predicates.add(cb.equal(root.get("origin"), request.getOrigin()));
      }

      if (request.getDestination() != null) {
        predicates.add(cb.equal(root.get("destination"), request.getDestination()));
      }

      if (request.getDepartureFrom() != null && request.getDepartureTo() != null) {
        predicates.add(cb.between(root.get("departureTime"),
            request.getDepartureFrom(),
            request.getDepartureTo()));
      } else {
        if (request.getDepartureFrom() != null) {
          log.info(request.toString());
          predicates.add(cb.greaterThanOrEqualTo(
              root.get("departureTime"),
              request.getDepartureFrom()));
        }
        if (request.getDepartureTo() != null) {
          predicates.add(cb.lessThanOrEqualTo(
              root.get("departureTime"),
              request.getDepartureTo()));
        }
      }

      if (request.getMaxPrice() != null) {
        assert query != null;
        Subquery<BigDecimal> priceSubquery = query.subquery(BigDecimal.class);
        Root<Ticket> ticketRoot = priceSubquery.from(Ticket.class);
        priceSubquery.select(cb.min(ticketRoot.get("price")))
            .where(cb.equal(ticketRoot.get("flight"), root));

        if (request.getMaxPrice() != null) {
          predicates.add(cb.lessThanOrEqualTo(priceSubquery, request.getMaxPrice()));
        }
      }

      return cb.and(predicates.toArray(new Predicate[0]));
    };
  }
}