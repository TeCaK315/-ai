import { NextRequest, NextResponse } from 'next/server';
import { ROIData } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json';

    let roiDataArray: ROIData[] = [];

    if (typeof window === 'undefined') {
      return NextResponse.json(
        { error: 'Data export is only available on client side' },
        { status: 400 }
      );
    }

    const storedData = localStorage.getItem('roi_data');
    if (storedData) {
      try {
        roiDataArray = JSON.parse(storedData);
      } catch (parseError) {
        console.error('Error parsing stored data:', parseError);
      }
    }

    if (format === 'csv') {
      const csvHeaders = [
        'ID',
        'Date',
        'Costs',
        'Revenue',
        'Automation Tool',
        'Leads Generated',
        'Created At',
      ];

      const csvRows = roiDataArray.map((item) => [
        item.id,
        item.date,
        item.costs.toString(),
        item.revenue.toString(),
        item.automationTool,
        item.leadsGenerated.toString(),
        item.createdAt,
      ]);

      const csvContent = [
        csvHeaders.join(','),
        ...csvRows.map((row) => row.join(',')),
      ].join('\n');

      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="roi-data-${new Date().toISOString()}.csv"`,
        },
      });
    }

    const jsonContent = JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        totalRecords: roiDataArray.length,
        data: roiDataArray,
      },
      null,
      2
    );

    return new NextResponse(jsonContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="roi-data-${new Date().toISOString()}.json"`,
      },
    });
  } catch (error) {
    console.error('Error exporting data:', error);
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    );
  }
}