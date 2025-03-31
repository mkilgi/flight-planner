package org.example.backend.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.example.backend.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeatRepository extends JpaRepository<Seat, UUID> {

  List<Seat> findByPlaneId(UUID id);

  Optional<Seat> findBySeatNumberAndPlaneId(String seatNumber, UUID planeId);
}