const GAS_URL =
  'https://script.google.com/macros/s/AKfycbxi5z6meKP31QHRJRxyRTslS-Dht8pMONcojAs-OdLHh4ZjOuF36myU2K-HFNpDyAc/exec';

export const tradeApi = {
  // 1. 取得資料 (doGet)
  getTrades: async () => {
    try {
      const response = await fetch(GAS_URL, {
        method: 'GET',
        mode: 'cors', // 明確指定 CORS 模式
      });
      if (!response.ok) throw new Error('網路回應不正常');

      const result = await response.json();
      // 根據我們剛才改的 GAS，資料在 result.data 裡
      return result;
    } catch (error) {
      throw new Error(error.message || '讀取清單時發生意外錯誤');
    }
  },

  // 2. 新增資料 (doPost)
  createTrade: async (formData) => {
    const payload = {
      ...formData,
      phone: String(formData.phone),
      action: 'create', // 確保 GAS 觸發新增邏輯
    };

    try {
      const response = await fetch(GAS_URL, {
        method: 'POST',
        mode: 'cors',
        // 💡 技巧：使用 text/plain 可以避開某些複雜的 CORS 預檢
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.status !== 'success')
        throw new Error(result.message || '新增失敗');
      return result;
    } catch (error) {
      throw new Error(error.message || '提交申請時發生錯誤，請稍後再試');
    }
  },

  // 3. 刪除資料 (doPost)
  deleteTrade: async (id) => {
    try {
      const response = await fetch(GAS_URL, {
        method: 'POST',
        mode: 'cors',
        header: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'delete',
          id: String(id).trim(),
        }),
      });
      const result = await response.json();
      if (result.status !== 'deleted') throw new Error('刪除指令執行失敗');
      return result;
    } catch (error) {
      throw new Error(error.message || '刪除資料時發生錯誤');
    }
  },

  // 4. 圖片轉 Base64 工具 (維持不變)
  uploadImage: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  },
};
