package org.example.backend.repository;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;
import org.example.backend.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, UUID> {

  @Query("SELECT MIN(t.price) FROM Ticket t WHERE t.flight.id = :flightId AND t.isBooked = false")
  Optional<BigDecimal> findLowestPriceByFlightId(UUID flightId);
}