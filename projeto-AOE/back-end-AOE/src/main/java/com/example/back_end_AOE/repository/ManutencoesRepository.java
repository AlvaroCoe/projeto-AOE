package com.example.back_end_AOE.repository;

import com.example.back_end_AOE.entity.ManutencoesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManutencoesRepository extends JpaRepository<ManutencoesEntity, Long> {
}