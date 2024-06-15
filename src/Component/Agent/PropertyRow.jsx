
import { useState } from 'react'
import DeleteModal from './DeleteModal'
import UpdateModal from './UpdateModal'
// import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
// import DeleteModal from '../Modal/DeleteModal'
// import UpdateRoomModal from '../Modal/UpdateRoomModal'

const PropertyRow = ({ property, refetch,handleDelete }) => {
    // for delete modal
    const [isOpen, setIsOpen] = useState(false)
    const [isEditModal, setIsEditModal] = useState(false)
    const closeModal=()=>{
        setIsOpen(false)
    }
    // for update modal
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src={property?.image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
        </div>
      </td>
      <td>
      <div className='ml-3'>
            <p className='text-gray-900 whitespace-no-wrap'>{property?.title}</p>
          </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{property?.location}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{property?.agent.name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <img
                alt='profile'
                src={property?.agent.image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{property?.price}</p>
      </td>
     
     
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button onClick={() => setIsOpen(true)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-white leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-900  '
          ></span>
          <span  className='relative'>Delete</span>
        </button>
        {/* Delete modal */}
       
     <DeleteModal isOpen={isOpen} closeModal={closeModal} handleDelete={handleDelete} id={property?._id}></DeleteModal>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button onClick={()=> setIsEditModal(true)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-white leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-900 '
          ></span>
          <span className='relative'>Update</span>
        </button>
        {/* Update Modal */}
        <UpdateModal isOpen={isEditModal} 
        setIsEditModalOpen={setIsEditModal}
        property={property}
        refetch={refetch}
        ></UpdateModal>
      </td>
    </tr>
  )
}



export default PropertyRow