package org.example.backend.service;

import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.example.backend.dto.FlightDTO;
import org.example.backend.dto.FlightSearchRequest;
import org.example.backend.model.Flight;
import org.example.backend.repository.FlightRepository;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

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

  public FlightDTO getFlightById(UUID id) throws Exception {
    Flight flight = flightRepository.findById(id).orElseThrow(() -> new Exception("Flight not found with id: " + id));
    return convertToDTO(flight);
  }

  public Page<FlightDTO> searchFlights(FlightSearchRequest request) {
    Page<Flight> flights = flightRepository.searchFlights(request);
    return flights.map(this::convertToDTO);
  }

  private FlightDTO convertToDTO(Flight flight) {
    return FlightDTO.builder()
        .id(flight.getId())
        .origin(flight.getOrigin())
        .destination(flight.getDestination())
        .distance(flight.getDistance())
        .departureTime(flight.getDepartureTime())
        .arrivalTime(flight.getArrivalTime())
        .planeModel(flight.getPlane().getModel())
        .lowestTicketPrice(ticketService.getLowestAvailableTicketForFlight(flight.getId()))
        .build();
  }

  public Flight getFlightOrThrow(UUID id) {
    return flightRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Flight not found"));
  }
}
