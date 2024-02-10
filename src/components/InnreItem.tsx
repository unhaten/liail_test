import { ListItem, ListItemButton, ListItemText } from "@mui/material"
import IService from "../types/IService"

const InnerItem = ({ data, item2, item }) => {
	return (
		<>
			{data.map((item3: IService) => {
				return (
					<>
						{item3.head === item2.id && (
							<ListItem>
								<ListItemButton>
									<ListItemText
										primary={
											`${item3.name}` +
											`${
												item.node === 1
													? ` - ${item3.price}`
													: ""
											}`
										}
									/>
								</ListItemButton>
							</ListItem>
						)}
					</>
				)
			})}
		</>
	)
}

export default InnerItem
