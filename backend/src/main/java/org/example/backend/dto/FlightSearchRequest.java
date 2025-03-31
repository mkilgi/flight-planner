package org.example.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

  public String toString() {
    return "FlightSearchRequest[" +
        (origin != null ? "origin='" + origin + "'" : "") +
        (destination != null ? ", destination='" + destination + "'" : "") +
        (departureFrom != null ? ", from=" + departureFrom.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) : "") +
        (departureTo != null ? ", to=" + departureTo.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) : "") +
        (maxPrice != null ? ", maxPrice=" + maxPrice.toPlainString() : "") +
        (page != 0 ? ", page=" + page : "") +
        (size != 20 ? ", size=" + size : "") +
        ']';
  }
}