package com.example.venture.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class FundData {
    @Id
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "fund_id")
    private Fund fund;

    private double irr;
    private double tvpi;
    private double dpi;
    private double moic;
    private double rvpi;

    private double accelerator;
    private double pre_seed;
    private double seed;
    private double series_a;


    public FundData(LocalDate date, Fund fund, double irr, double tvpi, double dpi, double moic, double rvpi,
                    double accelerator, double pre_seed, double seed, double series_a) {
        this.date = date;
        this.fund = fund;
        this.irr = irr;
        this.tvpi = tvpi;
        this.dpi = dpi;
        this.moic = moic;
        this.rvpi = rvpi;
        this.accelerator = accelerator;
        this.pre_seed = pre_seed;
        this.seed = seed;
        this.series_a = series_a;
    }
}
