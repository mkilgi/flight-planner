package org.example.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FlightSearchRequest {
  private String origin;
  private String destination;
  private LocalDateTime departureFrom;
  private LocalDateTime departureTo;
  private BigDecimal maxPrice;
  private int page = 0;
  private int size = 20;
}