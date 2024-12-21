package com.project.vsm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "CarRoute")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarRouteEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "car_id", nullable = false) // Liên kết với CarEntity
    private CarEntity car;

    @ManyToOne
    @JoinColumn(name = "route_id", nullable = false) // Liên kết với RouteEntity
    private RouteEntity route;

    @Column(name = "price", nullable = false)
    private int price;
}