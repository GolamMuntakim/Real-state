
import MenuItem from './MenuItem'

const AgentMenu = () => {
  return (
    <>
        <MenuItem  label='Agent Statastics' address='/dashboard' />
      <MenuItem  label='Add Property' address='add-property' />
      <MenuItem 
       label='My Added property' address='my-added' />
      <MenuItem
        label='Requested/offered Property'
        address='requested'
      />
      <MenuItem
        label='My Sold Properties'
        address='sold'
      />
    </>
  )
}

export default AgentMenu