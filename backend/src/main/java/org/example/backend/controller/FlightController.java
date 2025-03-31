package org.example.backend.controller;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.example.backend.dto.FlightDTO;
import org.example.backend.dto.FlightSearchRequest;
import org.example.backend.dto.SeatDTO;
import org.example.backend.model.Flight;
import org.example.backend.model.Seat;
import org.example.backend.model.Ticket;
import org.example.backend.service.DataGenerationService;
import org.example.backend.service.FlightService;
import org.example.backend.service.TicketService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/flights")
@RequiredArgsConstructor
public class FlightController {
  private final FlightService flightService;
  private final Logger log = LoggerFactory.getLogger(FlightController.class);
  private final TicketService ticketService;

  @GetMapping("/{id}")
  public ResponseEntity<FlightDTO> getFlightById(@PathVariable UUID id) throws Exception {
    FlightDTO flightDTO = flightService.getFlightById(id);
    return ResponseEntity.ok(flightDTO);
  }

  @GetMapping("/{id}/seats")
  public ResponseEntity<List<SeatDTO>> getFlightSeats(
      @PathVariable UUID id
  ) {
    Flight flight = flightService.getFlightOrThrow(id);
    List<Seat> seats = flight.getPlane().getSeats();
    List<Ticket> tickets = ticketService.getTicketsForFlight(id);

    Map<String, Ticket> seatTicketMap = tickets.stream()
        .collect(Collectors.toMap(t -> t.getSeat().getSeatNumber(), Function.identity()));

    // Combine seats and tickets info
    List<SeatDTO> seatDTOs = seats.stream()
        .map(seat -> mapToSeatDTO(seat, seatTicketMap.get(seat.getSeatNumber())))
        .toList();

    return ResponseEntity.ok(seatDTOs);
  }

  @GetMapping
  public ResponseEntity<Page<FlightDTO>> searchFlights(
      @RequestParam(required = false) String origin,
      @RequestParam(required = false) String destination,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime departureFrom,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime departureTo,
      @RequestParam(required = false) BigDecimal maxPrice,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "20") int size) {

    log.info("Received search request - From: {}, To: {}", departureFrom, departureTo);

    FlightSearchRequest request = new FlightSearchRequest();
    request.setOrigin(origin);
    request.setDestination(destination);
    request.setDepartureFrom(departureFrom);
    request.setDepartureTo(departureTo);
    request.setMaxPrice(maxPrice);
    request.setPage(page);
    request.setSize(size);

    return ResponseEntity.ok(flightService.searchFlights(request));
  }

  private SeatDTO mapToSeatDTO(Seat seat, Ticket ticket) {
    boolean isBooked = ticket != null && ticket.isBooked();
    BigDecimal price = ticket.getPrice();

    return new SeatDTO(
        seat.getSeatNumber(),
        seat.isHasWindow(),
        seat.isNearExit(),
        seat.isExtraLegroom(),
        isBooked,
        price
    );
  }
}
