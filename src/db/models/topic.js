import mongoose from 'mongoose'

const TopicSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		likes: {
			type: Number,
			default: 0,
		},
		presentationDate: {
			type: Date,
		},
		presented: {
			type: Boolean,
			default: false,
		},
		usersLikedIds: [{
			type: String,
			required: true,
		}],
		speakerId: {
			type: String,
		},
	},
	{
		strict: 'throw', // throw error, if field is not specified in the schema
		timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' },
	}
)

export default mongoose.model('Topic', TopicSchema)
