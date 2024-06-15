



const UpdateForm = ({handleSubmit, handleImage, setPropertyData, propertyData,imageText}) => {
    
  return (
   <>
   {/* <input type="file" name="" id="" /> */}
    <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 gap-10'>
        <div className=' p-4 bg-white w-full  m-auto rounded-lg'>
            <div className='file_upload px-5 py-3 relative '>
              <div className='flex flex-col w-max mx-auto text-center'>
                <label>
                  <input
                    className='text-sm cursor-pointer w-36 hidden'
                    type='file'
                    name='image'
                    onChange={e =>handleImage(e.target.files[0])}
                    id='image'
                    accept='image/*'
                    hidden
                  />
                  <div className='bg-blue-900 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-blue-500'>
                  {imageText.length>20? imageText.split('.')[0].slice(0,15)+'....'+imageText.split('.')[1] : imageText}
                  </div>
                </label>
              </div>
            </div>
          </div>
        
          <div className='space-y-1 text-sm'>
            <label htmlFor='title' className='block text-black'>
              Title
            </label>
            <input
              className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
              name='title'
              id='title'
              type='text'
              value={propertyData?.title}
              onChange={(e)=>setPropertyData({...propertyData, title: e.target.value})}
              placeholder='Title'
              required
            />
          </div>

         
          {/* <input type="file" /> */}
          <div className='space-y-1 text-sm'>
            <label htmlFor='location' className='block text-gray-600'>
              Location
            </label>
            <input
              className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
              name='location'
              id='location'
              type='text'
              value={propertyData?.location}
              onChange={(e)=>setPropertyData({...propertyData, location: e.target.value})}
              placeholder='Location'
              required
            />
          </div>
          <div className='flex justify-between gap-2'>
            <div className='space-y-1 text-sm'>
              <label htmlFor='price' className='block text-gray-600'>
                Price
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                name='price'
                id='price'
                type='number'
                value={propertyData?.price}
              onChange={(e)=>setPropertyData({...propertyData, price: e.target.value})}
                placeholder='Price'
                required
              />
            </div>
          </div>

          <div className='flex justify-between gap-2'>
              <div className='space-y-1 text-sm'>
                <label htmlFor='bedrooms' className='block text-gray-600'>
                  Agent Name
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                  name='name'
                  id='agentname'
                  type='text'
                  value={propertyData?.agent.name || ""}
                  placeholder='Agent Name'
                  readOnly
                />
              </div>

              <div className='space-y-1 text-sm'>
                <label htmlFor='bathrooms' className='block text-gray-600'>
                  Agent Email
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                  name='email'
                  id='agentemail'
                  type='text'
                  value={propertyData?.agent.email || ""}
                  placeholder='Agent Email'
                  readOnly
                />
              </div>
            </div>

        
        </div>

        <button
          type='submit'
          className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-blue-800'
        >
          Update
        </button>
      </form>
    </div>
   </>
  )
}

export default UpdateForm