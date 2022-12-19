/* eslint-disable tailwindcss/classnames-order */
import addIcon from '@/assets/add.png'
import accountIcon from '@/assets/account.png'
import { Button, Dropdown, Label, Modal, TextInput } from 'flowbite-react'
import { doSetAlias } from '@/substrate/index'

interface TypeItem {
  value: string
  label: string
}
function Contracts(): JSX.Element {
  const [activeType, setActiveType] = useState<TypeItem | null>(null)
  const [alias, setAlias] = useState('')
  const [addDlgOpen, setAddDlgOpen] = useState(false)
  const [name, setName] = useState('')
  const selectItem = (activeType: TypeItem) => {
    setActiveType(activeType)
  }
  const typeList: TypeItem[] = [
    {
      value: 'NormalAddr',
      label: 'web2 Address'
    },
    {
      value: 'ETHAddr',
      label: 'EHT Address'
    },
    {
      value: 'SubAddr',
      label: 'Substrate Address'
    }
  ]
  const submit = async () => {
    if (!activeType) {
      return
    }
    const accountObj = {} as any
    accountObj[activeType.value] = name
    await doSetAlias(accountObj, alias)
    setAddDlgOpen(false)
  }
  return (
    <>
      <div className="h-full py-4 bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <button
            onClick={() => setAddDlgOpen(true)}
            className="flex items-center justify-center w-16 h-16 transition rounded-full bg-btnBlue hover:bg-btnHoverBlue"
          >
            <img className="h-9 w-9" src={addIcon} alt="" />
          </button>
        </div>
        <div className="pl-14">
          <div className="flex items-center py-2 text-sm border-b cursor-pointer hover:bg-background">
            <div className="mr-14">
              <img className="h-30 w-30" src={accountIcon} alt="" />
            </div>
            <div>
              <div className="pb-1 font-bold">Michael Jordan</div>
              <div>1231woeijfiwno324onfoiew@pmail.io</div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={addDlgOpen}>
        <Modal.Header>Add Contract</Modal.Header>
        <Modal.Body>
          <div className="block mb-2">
            <Label htmlFor="countries" value="Select your country" />
          </div>
          <div className="flex">
            <Dropdown
              className="w-40"
              label={activeType ? activeType.label : 'Account Type'}
            >
              {typeList.map((item) => (
                <Dropdown.Item
                  key={item.value}
                  onClick={() => selectItem(item)}
                >
                  {item.label}
                </Dropdown.Item>
              ))}
            </Dropdown>
            <TextInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="ml-14"
              placeholder=""
            />
          </div>
          <div>
            <div className="block mb-2">
              <Label value="Your Alias" />
            </div>
            <TextInput
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="alias"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button gradientMonochrome="info" onClick={submit} color="gray">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Contracts
