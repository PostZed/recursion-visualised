export type CommentaryProps = {
    message: string
}

export default function Commentary({ message }: CommentaryProps) {
    return <div className="h-full overflow-hidden">
        <h3 className="overflow-auto">
            {message}
        </h3>
    </div>
}