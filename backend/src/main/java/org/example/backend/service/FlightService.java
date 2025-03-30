package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.Flight;
import org.example.backend.repository.FlightRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FlightService {
  private final FlightRepository flightRepository;
  private final TicketService ticketService;

  @Transactional
  public void createFlight(Flight flight) {
    Flight savedFlight = flightRepository.save(flight);
    ticketService.generateTicketsForFlight(savedFlight);
  }
}
