import mongoose from 'mongoose'

const UserSchema = mongoose.Schema(
	{
		name: {
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
		likedTopicsIds: [{
			type: String,
		}],
	},
	{
		strict: 'throw', // throw error, if field is not specified in the schema
		timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' },
	}
)

export default mongoose.model('User', UserSchema)
