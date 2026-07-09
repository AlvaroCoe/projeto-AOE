package com.example.back_end_AOE.repository;

import com.example.back_end_AOE.entity.IncidentesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncidentesRepository extends JpaRepository<IncidentesEntity, Long> {
}