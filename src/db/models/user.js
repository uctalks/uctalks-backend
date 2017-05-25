import mongoose from 'mongoose'

const UserSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		given_name: {
			type: String,
			required: true,
		},
		family_name: {
			type: String,
			required: true,
		},
		sub: {
			type: String,
			required: true,
			unique: true,
		},
		picture: {
			type: String,
			required: true,
		},
	},
	{
		strict: 'throw', // throw error, if field is not specified in the schema
		timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' },
	}
)

export default mongoose.model('User', UserSchema)
