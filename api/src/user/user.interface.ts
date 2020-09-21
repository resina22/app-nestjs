import { Address } from "../address/address.interface"
import { Contact } from "../contact/contact.interface"

export interface User {
  id: (number | null)
  name: string
  username: string
  website: string
  email: string
  address: Address
  contacts: (Contact | null)[]
}
