package org.example.backend.service;

import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.example.backend.dto.FlightDTO;
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

  public FlightDTO getFlightById(UUID id) throws Exception {
    Flight flight = flightRepository.findById(id).orElseThrow(() -> new Exception("Flight not found with id: " + id));
    return convertToDTO(flight);
  }

  private FlightDTO convertToDTO(Flight flight) {
    return FlightDTO.builder()
        .id(flight.getId())
        .origin(flight.getOrigin())
        .destination(flight.getDestination())
        .distance(flight.getDistance())
        .departureTime(flight.getDepartureTime())
        .arrivalTime(flight.getArrivalTime())
        .planeModel(flight.getPlane().getModel()) // Extract Plane's model
        .lowestTicketPrice(ticketService.getLowestAvailableTicketForFlight(flight.getId()))
        .build();
  }
}
