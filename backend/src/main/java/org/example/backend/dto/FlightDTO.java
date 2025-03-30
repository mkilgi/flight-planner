package org.example.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Builder;

@Builder
public record FlightDTO(
    UUID id,
    String origin,
    String destination,
    int distance,
    LocalDateTime departureTime,
    LocalDateTime arrivalTime,
    String planeModel,
    BigDecimal lowestTicketPrice
) {
}
