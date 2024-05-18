import axios from "axios";
import { useEffect, useState } from "react";
import './style.css'

const App = () => {

  const [datas, setDatas] = useState([])
  const [pagination, setPagination] = useState({
    currentPage: 1
  });

  const getData = () => {
    axios
      .get(`https://api.mudoapi.tech/menus?perPage=5&page=${pagination?.currentPage}`)
      .then((res) => {
        console.log(res);
        const response = res?.data?.data?.Data;
        console.log(response);
        setDatas(response);

        const pagination = {
          total: res.data.data.total,
          perPage: res.data.data.perPage,
          currentPage: res.data.data.currentPage,
          nextPage: res.data.data.nextPage,
          previousPage: res.data.data.previousPage
        };

        setPagination(pagination);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    getData();
  }, [pagination?.currentPage])

  const handleNext = () => {
    setPagination({
      ...pagination,
      currentPage: pagination?.currentPage + 1
    });
  }

  const handlePrevious = () => {
    setPagination({
      ...pagination,
      currentPage: pagination?.currentPage - 1
    })
  }

  return (
    <div>
      {datas.map((item) => (
        <div className="layout">
          <img src={item?.imageUrl} alt="" />
          <div className="text-layout">
            <h1>{item?.name}</h1>
            <h2>{`Harga: ${item?.price}.000`}</h2>
          </div>
        </div>
      ))}
      <div className="button-layout">
        <button disabled={!pagination?.previousPage} onClick={handlePrevious}>back</button>
        <button disabled={!pagination?.nextPage} onClick={handleNext}>next</button>
      </div>
    </div>
  )
}

export default App;