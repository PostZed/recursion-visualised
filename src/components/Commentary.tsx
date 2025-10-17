export type CommentaryProps = {
    message: string
}

export default function Commentary({ message }: CommentaryProps) {
    return <h3 className="h-[100%]">
        {message}
    </h3>
}