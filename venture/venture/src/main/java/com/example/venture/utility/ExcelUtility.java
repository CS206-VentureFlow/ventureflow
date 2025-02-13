package com.example.venture.utility;

import com.example.venture.dto.FundData;
import com.example.venture.service.FundService;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@Component
public class ExcelUtility {

    private final FundService fundService;

    public ExcelUtility(FundService fundService) {
        this.fundService = fundService;
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
            FundData fundData = new FundData();
            // TODO: Map other columns to FundData fields here
            fundData.setFund(fundID);

            fundService.save(fundData); // Save each FundData object
        }

        workbook.close();
        fileInputStream.close();
    }
}
