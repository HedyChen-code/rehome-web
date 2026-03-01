import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { tradeApi } from '../../api/tradeApi';

// const API_BASE = import.meta.env.VITE_API_BASE;
// const API_PATH = import.meta.env.VITE_API_PATH;

function AdminTradeList() {
  const [tradeList, setTradeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. 取得資料
    const fetchTradeList = async () => {
        try {
        setIsLoading(true);
        const data = await tradeApi.getTrades();
        console.log("從 API 拿到的資料是:", data);
        setTradeList(data); // json-server 回傳的是陣列
        } catch (error) {
        console.error("資料讀取失敗", error);
        } finally {
        setIsLoading(false);
        }
    };

    // 新增刪除功能
    const handleDelete = async (id) => {
        if (!window.confirm('確定要刪除這筆申請嗎？')) return;
        try {
        await tradeApi.deleteTrade(id);
        fetchTradeList(); // 重新整理列表
        } catch {
        alert('刪除失敗');
        }
    };
    


  useEffect(() => {
    fetchTradeList();
    
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>家具收購申請清單</h2>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th style={{ width: '120px' }}>照片</th>
              <th>姓名 </th>
              <th>聯絡電話</th>
              <th>類別 </th>
              <th>狀況 </th>
              <th>尺寸 (寬x深x高)</th>
              <th>取件地址</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="7" className="text-center">讀取中...</td></tr>
            ) :Array.isArray(tradeList) && tradeList.length > 0 ? (
              tradeList.map((item) => (
                <tr key={item.id}>
                  {/* 照片: 對應 image */}
                  <td>
                    <img 
                      src={item.image || 'https://via.placeholder.com/100'} 
                      alt="家具照片" 
                      className="img-thumbnail"
                      style={{ width: '100px', height: '80px', objectFit: 'cover' }}
                    />
                  </td>
                  {/* 姓名: 對應 name */}
                  <td>
                    <div className="fw-bold">{item.name}</div>
                  </td> 
                 {/* 電話: 對應 phone */}
                  <td>   
                    <div className="fw-bold">{item.phone}</div>
                  </td>
                  {/* 類別 */}
                  <td>
                    <span>{item.category || '未分類'}</span>
                  </td> 
                  {/* 狀況 */}
                  <td>
                    <span>{item.condition || '未知狀況'}</span>
                  </td>
                  {/* 尺寸 (寬x深x高): 寬->tag[2]; 深->tag[3]; 高->tag[4] */}
                  <td>
                    <span className="text-primary-70">
                      {item.width ? `${item.width} x ${item.depth} x ${item.height} cm` : '未提供尺寸'}
                    </span>
                  </td>
                  {/* 取件地址: 地址->description */}
                  <td>{item.address}</td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button className="btn btn-outline-danger" onClick={() => handleDelete(item.id)}>刪除</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7" className="text-center">目前沒有申請資料</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTradeList;