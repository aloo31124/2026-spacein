import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  // 轉換 JSON 為 CSV 字串（跳過巢狀欄位）
  convertToCSV(jsonArray: any[]): string {
      if (!jsonArray || jsonArray.length === 0) return '';

      const headers = Object.keys(jsonArray[0]).filter(key => typeof jsonArray[0][key] !== 'object');
      const csvRows = jsonArray.map(row =>
          headers.map(field => `"${String(row[field] || '').replace(/"/g, '""')}"`).join(',')
      );

      return [headers.join(','), ...csvRows].join('\n');
  }

  // 下載 CSV 檔案（UTF-8）
  downloadCSV(data: string, filename: string = 'export.csv') {
      const BOM = '\uFEFF'; // UTF-8 BOM 避免中文亂碼
      const blob = new Blob([BOM + data], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  }

}
