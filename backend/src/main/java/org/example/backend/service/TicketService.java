package org.example.backend.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.example.backend.model.Flight;
import org.example.backend.model.Plane;
import org.example.backend.model.Seat;
import org.example.backend.model.Ticket;
import org.example.backend.repository.SeatRepository;
import org.example.backend.repository.TicketRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class TicketService {

  private final TicketRepository ticketRepository;
  private final SeatRepository seatRepository;
  private final Random random = new Random();

  @Transactional
  public void generateTicketsForFlight(Flight flight) {
    if (flight.getPlane() == null) {
      throw new IllegalStateException("Flight must have an assigned plane.");
    }

    Plane plane = flight.getPlane();
    List<Seat> seats = seatRepository.findByPlaneId(plane.getId());

    List<Ticket> tickets = seats.stream().map(seat -> {
      BigDecimal basePrice = BigDecimal.valueOf(20);
      BigDecimal pricePerKm = BigDecimal.valueOf(0.1);

      // Automatic pricing logic
      if (seat.isHasWindow()) {
        pricePerKm = pricePerKm.add(BigDecimal.valueOf(0.02));
      }

      if (seat.isExtraLegroom()) {
        pricePerKm = pricePerKm.add(BigDecimal.valueOf(0.02));
      }

      if (seat.isNearExit()) {
        pricePerKm = pricePerKm.add(BigDecimal.valueOf(0.02));
      }

      long flightDistance = flight.getDistance();
      BigDecimal distancePrice = pricePerKm.multiply(BigDecimal.valueOf(flightDistance));
      BigDecimal totalPrice = basePrice.add(distancePrice);

      return Ticket.builder()
          .flight(flight)
          .seat(seat)
          .price(totalPrice)
          .isBooked(random.nextBoolean())
          .build();
    }).collect(Collectors.toList());

    ticketRepository.saveAll(tickets);
  }

  public BigDecimal getLowestAvailableTicketForFlight(UUID flightId) {
    return ticketRepository.findLowestPriceByFlightId(flightId).orElse(null);
  }

  public List<Ticket> getTicketsForFlight(UUID id) {
    return ticketRepository.findByFlightId(id);
  }

  public Ticket getTicket(Flight flight, Seat seat) {
    return ticketRepository.findByFlightIdAndSeatId(flight.getId(), seat.getId())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Seat already booked"));
  }

  public void bookTicket(Ticket ticket) {
    if (ticket.isBooked()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Seat already booked");
    }
    ticket.setBooked(true);
    ticketRepository.save(ticket);
  }
}
