package org.example.backend.dto;

import java.math.BigDecimal;
import lombok.Builder;

@Builder
public record SeatDTO(
    String seatNumber,
    boolean hasWindow,
    boolean nearExit,
    boolean extraLegroom,
    boolean isBooked,
    BigDecimal price
) {}