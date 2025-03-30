package org.example.backend.model;

import jakarta.persistence.*;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Seat {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(name = "seat_number", nullable = false)
  private String seatNumber;

  @Column(name = "has_window", nullable = false)
  private boolean hasWindow;

  @Column(name = "near_exit", nullable = false)
  private boolean nearExit;

  @Column(name = "extra_legroom", nullable = false)
  private boolean extraLegroom;

  @ManyToOne
  @JoinColumn(name = "plane_id", nullable = false)
  private Plane plane;
}