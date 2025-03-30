package org.example.backend.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.example.backend.model.Flight;
import org.example.backend.model.Plane;
import org.example.backend.model.Seat;
import org.example.backend.model.Ticket;
import org.example.backend.repository.SeatRepository;
import org.example.backend.repository.TicketRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TicketService {

  private final TicketRepository ticketRepository;
  private final SeatRepository seatRepository;

  @Transactional
  public void generateTicketsForFlight(Flight flight) {
    if (flight.getPlane() == null) {
      throw new IllegalStateException("Flight must have an assigned plane.");
    }

    Plane plane = flight.getPlane();
    List<Seat> seats = seatRepository.findByPlaneId(plane.getId());

    List<Ticket> tickets = seats.stream().map(seat -> {
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
      BigDecimal price = pricePerKm.multiply(BigDecimal.valueOf(flightDistance));

      return Ticket.builder()
          .flight(flight)
          .seat(seat)
          .price(price)
          .isBooked(false)
          .build();
    }).collect(Collectors.toList());

    ticketRepository.saveAll(tickets);
  }
}
