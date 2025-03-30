package org.example.backend.controller;

import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.example.backend.dto.FlightDTO;
import org.example.backend.service.FlightService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/flights")
@RequiredArgsConstructor
public class FlightController {
  private final FlightService flightService;

  @GetMapping("/{id}")
  public ResponseEntity<FlightDTO> getFlightById(@PathVariable UUID id) throws Exception {
    FlightDTO flightDTO = flightService.getFlightById(id);
    return ResponseEntity.ok(flightDTO);
  }
}
