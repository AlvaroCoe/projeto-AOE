package com.example.back_end_AOE.repository;

import com.example.back_end_AOE.entity.TripulacaoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripulacaoRepository extends JpaRepository<TripulacaoEntity, Long> {
}