package org.example.backend.service;

import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.example.backend.model.Seat;
import org.example.backend.repository.SeatRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class SeatService {
  private final SeatRepository seatRepository;

  public List<Seat> getSeatsByPlane(UUID planeId) {
    return seatRepository.findByPlaneId(planeId);
  }

  public Seat getSeatOrThrow(String seatNumber, UUID planeId) {
    return seatRepository.findBySeatNumberAndPlaneId(seatNumber, planeId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Seat not found"));
  }
}