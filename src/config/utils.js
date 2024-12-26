import axios from "axios";

const collapseData = (data) => {
  // TODO: Implement data collapsing logic here
  const reduced = data.reduce((prev, cur) => {
    if(prev.length !== 0 && Math.abs(prev[prev.length - 1].price - cur.price) < 0.001) return prev;
    return [...prev, cur];
  }, []);
  return reduced;
}
const getData = async (symbol) =>{
    const data = await axios.get(`http://localhost:5001/api/currency?symbol=${symbol}`);
    const filteredData = collapseData(data.data.data).slice(-60).map((item) => {
      return {
        date: item.date,
        price: parseFloat(item.price)
      }
    });
    console.log(filteredData);
    
    return filteredData;
    // return [
    //   {
    //     quarter: "Q1",
    //     petrol: 200,
    //     diesel: 100,
    //   },
    //   {
    //     quarter: "Q2",
    //     petrol: 300,
    //     diesel: 130,
    //   },
    //   {
    //     quarter: "Q3",
    //     petrol: 350,
    //     diesel: 160,
    //   },
    //   {
    //     quarter: "Q4",
    //     petrol: 400,
    //     diesel: 200,
    //   },
    // ];
  }

  export {
    getData
  };