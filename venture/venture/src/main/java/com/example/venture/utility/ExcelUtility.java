package com.example.venture.utility;

import com.example.venture.model.Fund;
import com.example.venture.model.FundData;
import com.example.venture.service.FundDataService;
import com.example.venture.service.FundService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;

@Component
public class ExcelUtility {

    private final FundService fundService;
    private final FundDataService fundDataService;

    public ExcelUtility(FundService fundService, FundDataService fundDataService) {
        this.fundService = fundService;
        this.fundDataService = fundDataService;
    }

    public void readExcel(MultipartFile file, Long fundID) throws IOException {
        // Retrieve input stream from uploaded file
        InputStream fileInputStream = file.getInputStream();
        // Create a workbook object from the input stream --> allow you to read .xlsx files
        Workbook workbook = new XSSFWorkbook(fileInputStream);
        // Retrieve the first sheet of the workbook and iterate through it
        Sheet sheet = workbook.getSheetAt(0);

        for (Row row : sheet) {
            if (row.getRowNum() == 0) {
                continue; // Skip header row
            }
            // TODO: Map other columns to FundData fields here
            Cell dateCell = row.getCell(0);
            Cell irrCell = row.getCell(1);
            Cell tvpiCell = row.getCell(2);
            Cell dpiCell = row.getCell(3);
            Cell moicCell = row.getCell(4);
            Cell rvpiCell = row.getCell(5);
            Cell acceleratorCell = row.getCell(6);
            Cell preSeedCell = row.getCell(7);
            Cell seedCell = row.getCell(8);
            Cell seriesACell = row.getCell(9);

            LocalDate date;
            if (dateCell.getCellType() == CellType.NUMERIC) {
                date = dateCell.getLocalDateTimeCellValue().toLocalDate();
            } else if (dateCell.getCellType() == CellType.STRING) {
                date = LocalDate.parse(dateCell.getStringCellValue());
            } else {
                throw new IllegalArgumentException("Invalid date format in cell");
            }
            double irr = irrCell.getNumericCellValue();
            double tvpi = tvpiCell.getNumericCellValue();
            double dpi = dpiCell.getNumericCellValue();
            double moic = moicCell.getNumericCellValue();
            double rvpi = rvpiCell.getNumericCellValue();
            double accelerator = acceleratorCell.getNumericCellValue();
            double preSeed = preSeedCell.getNumericCellValue();
            double seed = seedCell.getNumericCellValue();
            double seriesA = seriesACell.getNumericCellValue();

            FundData fundData = new FundData(date, fundService.getFundById(fundID), irr, tvpi, dpi, moic, rvpi,
                    accelerator, preSeed, seed, seriesA);

            fundDataService.saveOrUpdateFundData(fundData); // Save each FundData object
        }

        workbook.close();
        fileInputStream.close();
    }
}
