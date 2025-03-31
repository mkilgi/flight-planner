package org.example.backend.service;

import static java.util.Map.entry;

import jakarta.annotation.PostConstruct;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;
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

  /**
   * AI generated city distances map to add somewhat realistic data
   */
  private static final Map<String, Map<String, Integer>> CITY_DISTANCES = Map.ofEntries(
      // Northern Europe
      entry("Tallinn", Map.of("Helsinki", 100, "Riga", 310, "Stockholm", 380, "Oslo", 840)),
      entry("Helsinki", Map.of("Tallinn", 100, "Stockholm", 400, "Oslo", 820, "Copenhagen", 890)),
      entry("Riga", Map.of("Tallinn", 310, "Vilnius", 295, "Warsaw", 480, "Berlin", 590)),
      entry("Vilnius", Map.of("Riga", 295, "Warsaw", 400, "Kyiv", 610, "Minsk", 185)),

      // Western Europe
      entry("Berlin", Map.of("Warsaw", 575, "Prague", 350, "Amsterdam", 660, "Paris", 1050)),
      entry("Amsterdam", Map.of("London", 360, "Brussels", 210, "Paris", 430, "Frankfurt", 440)),
      entry("Paris", Map.of("London", 340, "Brussels", 310, "Frankfurt", 580, "Zurich", 615)),
      entry("London", Map.of("Amsterdam", 360, "Paris", 340, "Edinburgh", 530, "Dublin", 465)),

      // Central Europe
      entry("Prague", Map.of("Berlin", 350, "Vienna", 335, "Warsaw", 630, "Budapest", 550)),
      entry("Vienna", Map.of("Prague", 335, "Budapest", 245, "Bratislava", 80, "Munich", 400)),
      entry("Budapest", Map.of("Vienna", 245, "Bucharest", 900, "Belgrade", 380, "Zagreb", 345)),

      // Southern Europe
      entry("Rome", Map.of("Milan", 575, "Paris", 1100, "Barcelona", 1360, "Athens", 1050)),
      entry("Madrid", Map.of("Barcelona", 620, "Lisbon", 625, "Paris", 1270, "Rome", 1950)),
      entry("Barcelona", Map.of("Madrid", 620, "Paris", 1030, "Marseille", 515, "Lisbon", 1005)),

      // Nordic
      entry("Oslo", Map.of("Stockholm", 520, "Copenhagen", 485, "Gothenburg", 295, "Helsinki", 820)),
      entry("Stockholm", Map.of("Oslo", 520, "Copenhagen", 525, "Tallinn", 380, "Helsinki", 400)),
      entry("Copenhagen", Map.of("Hamburg", 355, "Oslo", 485, "Stockholm", 525, "Amsterdam", 625)),

      // Eastern Europe
      entry("Warsaw", Map.of("Berlin", 575, "Prague", 630, "Kyiv", 790, "Vilnius", 400)),
      entry("Kyiv", Map.of("Warsaw", 790, "Odessa", 475, "Minsk", 570, "Bucharest", 890)),
      entry("Bucharest", Map.of("Budapest", 900, "Sofia", 395, "Istanbul", 680, "Kyiv", 890))
  );

  @PostConstruct
  public void generateData() {
    if (planeRepository.count() == 0) {
      log.info("Generating data for application");

      Plane plane = generatePlaneAndSeats();

      LocalDateTime baseDate = LocalDateTime.now().plusDays(7).withHour(6).withMinute(0);
      List<Flight> flights = new ArrayList<>();

      for (String origin : CITY_DISTANCES.keySet()) {
        Map<String, Integer> destinations = CITY_DISTANCES.get(origin);
        for (String destination : destinations.keySet()) {
          if (!origin.equals(destination)) {
            int distance = destinations.get(destination);

            for (int i = 0; i < 10; i++) {
              int randomDay = ThreadLocalRandom.current().nextInt(0, 90);

              int randomHour = ThreadLocalRandom.current().nextInt(0, 23);;

              LocalDateTime departure = baseDate
                  .plusDays(randomDay)
                  .withHour(randomHour)
                  .withMinute(ThreadLocalRandom.current().nextInt(0, 60));

              double hours = (distance / 800.0) + 0.5;
              LocalDateTime arrival = departure.plusMinutes((long)(hours * 60));

              flights.add(Flight.builder()
                  .origin(origin)
                  .destination(destination)
                  .distance(distance)
                  .departureTime(departure)
                  .arrivalTime(arrival)
                  .plane(plane)
                  .build());
            }
          }
        }}

      flights.forEach(flightService::createFlight); // save and generate tickets
      log.info("Generated {} random flights between {} cities",
          flights.size(), CITY_DISTANCES.size());

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
