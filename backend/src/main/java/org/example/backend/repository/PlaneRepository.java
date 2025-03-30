package org.example.backend.repository;

import java.util.UUID;
import org.example.backend.model.Plane;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaneRepository extends JpaRepository<Plane, UUID> {
}