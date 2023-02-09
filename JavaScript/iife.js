const app = (function () {
  const keyLocalStorageListSP = "DANHSACHSP";

  const keyLocalStorageItemCart = "DANHSACHITEMCART";
  
  // Lưu dữ liệu localStore
  const saveData = (key, value) => {
      const setjson = JSON.stringify(value);
      localStorage.setItem(key, setjson);
  };

  // Lấy dữ liệu localStore
  const getData = (key) => {
      return JSON.parse(localStorage.getItem(key));
  };

  // Thêm dữ liệu
  const handleCreateOrderInfos = async function (data) {
      const res = await fetch('https://63c0cc0f71656267186d4e0b.mockapi.io/api/orderInfos', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
      })
      return res.json();
  }

  // Lấy dữ liệu
  const handleGetOrderInfos = async function () {
      const res = await fetch(`https://63c0cc0f71656267186d4e0b.mockapi.io/api/orderInfos`);
      return await res.json();
  }

  // Sửa dữ liệu
  const handleEditOrderInfos = async function (data) {
      const res = await fetch('https://63c0cc0f71656267186d4e0b.mockapi.io/api/orderInfos/' + data.id, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
      })
      return res.json();

  }

  // Xóa dữ liệu
  const handleDeleteOrderInfos = async function (data) {
      const res = await fetch('https://63c0cc0f71656267186d4e0b.mockapi.io/api/orderInfos/' + data.id, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          },
      })
  }

  return {
      saveData,
      getData,
      handleCreateOrderInfos,
      handleGetOrderInfos,
      handleDeleteOrderInfos,
      handleEditOrderInfos
  }
})();