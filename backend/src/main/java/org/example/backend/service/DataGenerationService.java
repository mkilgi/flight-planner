package org.example.backend.service;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.example.backend.model.Flight;
import org.example.backend.model.Plane;
import org.example.backend.model.Seat;
import org.example.backend.repository.FlightRepository;
import org.example.backend.repository.PlaneRepository;
import org.example.backend.repository.SeatRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DataGenerationService {

  private static final Logger log = LoggerFactory.getLogger(DataGenerationService.class);
  private final PlaneRepository planeRepository;
  private final SeatRepository seatRepository;
  private final FlightService flightService;

  @PostConstruct
  public void generateData() {
    if (planeRepository.count() == 0) {
      log.info("Generating data for application");

      Plane plane = generatePlaneAndSeats();

      // TODO: Generate flights automatically with somewhat logical data
      List<Flight> flights = List.of(
          Flight.builder()
              .origin("Tallinn")
              .destination("Helsinki")
              .distance(100)
              .departureTime(LocalDateTime.now().plusDays(4))
              .arrivalTime(LocalDateTime.now().plusDays(1).plusHours(5))
              .plane(plane)
              .build(),
          Flight.builder()
              .origin("Riga")
              .destination("Berlin")
              .distance(600)
              .departureTime(LocalDateTime.now().plusDays(5))
              .arrivalTime(LocalDateTime.now().plusDays(2).plusHours(3))
              .plane(plane)
              .build(),
          Flight.builder()
              .origin("Riga")
              .destination("Tallinn")
              .distance(300)
              .departureTime(LocalDateTime.now().plusDays(6))
              .arrivalTime(LocalDateTime.now().plusDays(2).plusHours(3))
              .plane(plane)
              .build()
      );

      flights.forEach(flightService::createFlight); // save and generate tickets

      System.out.println("Database seeding completed!");
    }
  }

  private Plane generatePlaneAndSeats() {
    Plane plane = Plane.builder()
        .model("Beans 737")
        .build();
    plane = planeRepository.save(plane);

    List<Seat> seats = new ArrayList<>();
    for (int i = 1; i <= 30; i++) {
      for(char j = 'A'; j <= 'F'; j++) {
        String seatNumber = i + String.valueOf(j);
        Seat seat = Seat.builder()
            .seatNumber(seatNumber)
            .hasWindow(j == 'A' || j == 'F')
            .nearExit(i == 1 || i == 30)
            .extraLegroom(i == 1 || i == 15)
            .plane(plane)
            .build();
        seats.add(seat);
      }
    }
    seatRepository.saveAll(seats);
    log.info("Generated plane and seats successfully");

    return plane;
  }
}
