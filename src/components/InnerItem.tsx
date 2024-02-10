import { Box, ListItem, ListItemButton, ListItemText } from "@mui/material"
import IService from "../types/IService"
import { FC } from "react"

interface InnerItemProps {
	data: IService[] | null
	item: IService
	item2: IService
}

const InnerItem: FC<InnerItemProps> = ({ data, item2, item }) => {
	return (
		<>
			{data &&
				data.map((item3: IService) => {
					return (
						<Box key={item3.id}>
							{item3.head === item2.id && (
								<ListItem sx={{ ml: 2 }}>
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
						</Box>
					)
				})}
		</>
	)
}

export default InnerItem
