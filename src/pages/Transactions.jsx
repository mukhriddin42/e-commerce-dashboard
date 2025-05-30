import React, { useEffect, useState } from 'react'
import { Button } from 'rsuite'
import paypalLogo from '../assets/icons/image.png'
import axios from 'axios'
import DetailButton from '../components/DetailButton'
import jsPDF from 'jspdf'



const Transactions = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [oneTransaction, setOneTransaction] = useState([])
  console.log(transactions);

  useEffect(() => {
    axios.get('https://67fdf9a43da09811b1771b6c.mockapi.io/products')
      .then(res => {
        setTransactions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Bir dunyo kod", err);
        setLoading(false)
      });
  }, [])

  function openModal() {
    document.getElementById("transaction-details").classList.remove("hidden")
    document.getElementById("transaction-details-empty").classList.add("hidden")
  }

  function handleClick(id) {
    const oneTransaction = transactions.filter(transaction => transaction.id === id)
    setOneTransaction(oneTransaction)
    console.log(oneTransaction);
    openModal()
  }

  function downloadTransactionAsPdf(transaction) {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [120, 150]
    });

    const t = transaction[0];

    doc.setFontSize(16);
    doc.text("Transaction details", 10, 10);

    doc.setFontSize(12);
    doc.text(`Supplier: TemplateMount`, 10, 30);
    doc.text(`Date: ${t?.date?.toString().split("T")[0]}`, 10, 40);
    doc.text(`Billing Address: ${t?.billingAddress}`, 10, 50);
    doc.text(`VAT ID: ${t?.vatId}`, 10, 60);
    doc.text(`Email: ${t?.email}`, 10, 70);
    doc.text(`Payment Method: ${t?.method}`, 10, 80);
    doc.text(`Paid Amount: ${t?.paid}`, 10, 90);

    doc.save(`transaction_${t?.id || 'unknown'}.pdf`);
  }

  return (
    <div className='border-red-400 shadow-main p-10 rounded-sm flex gap-6 justify-between'>
      <div className='w-[100%]'>
        <div className='flex justify-between border-b-[2px] pb-[15px] border-gray-500'>
          <input className='shadow-main rounded-sm p-2' type="text" placeholder='Search...' />
          <select className='p-2 shadow-main rounded-sm cursor-pointer' name="filter_method" id="">
            <option value="">Amex</option>
            <option value="">Visa</option>
            <option value="">Humo</option>
            <option value="">Uzcard</option>
          </select>
        </div>
        <div className='my-4'>
          {loading ? (
            <div className='w-full py-40 flex items-center justify-center'>
              <div className='loader'></div>
            </div>
          ) : (
            <table className='table-auto border-separate border-spacing-y-2'>
              <tr >
                <th className='w-40 text-left'>Transaction ID</th>
                <th className='w-40 text-left'>Paid</th>
                <th className='w-60 text-left'>Method</th>
                <th className='w-60 text-left'>Date</th>
                <th className='w-40 text-left'>Action</th>
              </tr>
              {transactions.map((transaction) => (
                <tr className='h-12'>
                  <td>{transaction.id}</td>
                  <td>$ {transaction.paid}</td>
                  <td className='flex items-center gap-4'>
                    <div className='w-10 overflow-hidden'>
                      <img className='w-[100%]' src={paypalLogo} alt="" />
                    </div>
                    <p>{transaction.method.slice(0, 5)}</p>
                  </td>
                  <td>{transaction.date.toString().split("T")[0]}, 14:01</td>
                  <td>
                    {/* <p className='inline px-4 py-1 rounded-sm cursor-pointer border-2 border-[#5DB996] hover:border-[#118B50] hover:bg-[#118B50] hover:text-white transactions-text transition-colors duration-300'>Details</p> */}
                    < DetailButton onClick={() => handleClick(transaction.id)} text="Details" />
                  </td>
                </tr>
              ))}
            </table>
          )}
        </div>
      </div>
      <div className='shadow-main rounded-sm min-w-70 p-4'>
        <p id='transaction-details-empty' className='non-selected-tr text-center text-[#A6AEBF]'>Please select transactions to see details</p>

        {oneTransaction && (
          <div id='transaction-details' className=' hidden'>
            <p className='text-[16px] border-b-[2px] pb-[15px] border-gray-500 font-bold'>Transaction details</p>
            <div>
              <div className='py-4 flex flex-col gap-5'>
                <div>
                  <p className='font-bold'>Suplier:</p>
                  <span>TemplateMount</span>
                </div>
                <div>
                  <p className='font-bold'>Date:</p>
                  <p>{oneTransaction[0]?.date.toString().split("T")[0]}</p>
                </div>
                <div>
                  <p className='font-bold'>Billing address:</p>
                  <p>{oneTransaction[0]?.billingAddress}</p>
                </div>
                <div>
                  <p className='font-bold'>VAT ID:</p>
                  <p>{oneTransaction[0]?.vatId}</p>
                </div>
                <div>
                  <p className='font-bold'>Email:</p>
                  <p>{oneTransaction[0]?.email}</p>
                </div>
                <div>
                  <p className='font-bold'>Payment:</p>
                  <p>{oneTransaction[0]?.method.slice(0, 5)}</p>
                  <p className='text-xl'>{oneTransaction[0]?.paid}</p>
                </div>
              </div>
            </div>
            <p onClick={() => downloadTransactionAsPdf(oneTransaction)} className='inline px-4 py-1 rounded-sm cursor-pointer border-2 border-[#5DB996] hover:border-[#118B50] hover:bg-[#118B50] hover:text-white transactions-text transition-colors duration-300'>Download transaciton</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Transactions