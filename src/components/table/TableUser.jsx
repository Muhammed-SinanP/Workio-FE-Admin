import React from 'react'
import { useConfirm } from "material-ui-confirm";
import { axiosInstance } from '../../config/axiosInstance.js';
import toast from "react-hot-toast"


const TableUser = ({data,refresh,setRefresh,headColor,userRole}) => {

  const confirm = useConfirm();

  function handleDelete(userId,userEmail){
      
      async function deleteUser(){
          try {
              const response = await axiosInstance({
                  method:"DELETE",
                  url:`/admin/users/${userId}`

              })
              if(response.status===200){
                  toast.success("User deletion success")
                  setRefresh(!refresh)
              }
              else{
                  toast.error("User deletion failed")
              }
          } catch (err) {
              console.log(err);
              
          }
      }

      confirm({ title:"Confirm delete user",
          description:`Deleting user ${userEmail}, this can't be undone`,
          confirmationText:"Confirm"
       })
      .then(() => {
        deleteUser()
      })
      .catch(() => {
     console.log("delete user cancel");
     
      });

  }
   
  return (
    <>

      <div className={`grid grid-cols-12 gap-2 font-medium text-sm 2xl:text-lg ${headColor} dark:bg-darkColor-input dark:text-darkColor-text p-1.5 rounded-t-md text-white`}>
      <div className='col-span-1  md:block hidden'>Sl.No.</div>
      <div className='col-span-4 '>User</div>
      
      {userRole==="all" && <div className='col-span-4 md:col-span-3 '>Role</div>}
      <div className='col-span-4 '>Action</div>
      
      </div>
    {data&&data.length>0&& data.map((element,index)=><div key={index} className='grid bg-gray-100 dark:bg-darkColor-light items-center border-b text-xs 2xl:text-sm grid-cols-12 gap-2 py-1  px-2'>
      <div className='col-span-1 md:block hidden'>{index+1}</div>
      <div className='col-span-4'>
        <div className='truncate capitalize'>{element.name}</div>
        <div className='truncate text-xs'>{element.email}</div>
      </div>
      
     {userRole==="all" && <div className='col-span-4 md:col-span-3 capitalize'>{element.role === "employer"?"Employer":"Job Seeker"}</div>} 
      <div className='col-span-4 flex '><button onClick={()=>handleDelete(element._id,element.email)} className='btn btn-xs bg-red-600 border-none text-white hover:bg-red-700'>Remove</button></div>
      
      </div>)}
      </>
  )
}

export default TableUser