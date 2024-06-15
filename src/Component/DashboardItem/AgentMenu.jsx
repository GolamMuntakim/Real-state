
import MenuItem from './MenuItem'

const AgentMenu = () => {
  return (
    <>
       
      <MenuItem  label='Add Property' address='add-property' />
      <MenuItem 
   
       label='My Added property' address='my-added' />
      <MenuItem
       
        label='Requested/offered Property'
        address='requested'
      />
    </>
  )
}

export default AgentMenu