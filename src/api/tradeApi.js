import axios from 'axios';

const client = axios.create({
  baseURL: 'https://rehome.onrender.com', // json-server 埠口
  timeout: 5000
});

export const tradeApi = {
  // 1. 取得列表 
    getTrades: async (keyword = "") => {
        // 建立一個參數物件
        const queryParams = {};
        
        // 只有當 keyword 有值時，才加入 q 參數
        if (keyword.trim() !== "") {
        queryParams.q = keyword;
        }

        const response = await client.get('/data', {
        params: queryParams // 這樣如果是空字串，發出的請求就是乾淨的 /data
        });

        const result = response.data;
        // 確保回傳陣列
        return Array.isArray(result) ? result : (result.data || []);
    },

  // 2. 取得詳細資料 (使用 expand 關聯)
  // 用法: getTradeById(1)
  getTradeById: async (id) => {
    const response = await client.get(`/data/${id}`);
    return response.data;
  },

  // 3. 新增家具收購申請
  createTrade: async (newTradeData) => {
    const response = await client.post('/data', newTradeData);
    return response.data;
  },

  // 4. 修改家具收購申請 (部分更新)
  updateTrade: async (id, updatedFields) => {
    const response = await client.patch(`/data/${id}`, updatedFields);
    return response.data;
  },

  // 5. 刪除家具收購申請
  deleteTrade: async (id) => {
    await client.delete(`/data/${id}`);
    return id; // 通常回傳 id 確認刪除成功
  },


  // 模擬圖片上傳：將檔案轉換為 Base64 格式
  uploadImage: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result); // 回傳 base64 字串
      reader.onerror = (error) => reject(error);
    });
  }
};