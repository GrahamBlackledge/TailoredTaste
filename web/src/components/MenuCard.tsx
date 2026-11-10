type MenuCardProps = {
    title: string;
    description: string;
    
};

export default function MenuCard({ title, description }: MenuCardProps) {
    return (
        <div className="bg-amber-50 rounded-lg borer border-amber-100 p-6">
            <h3 className="text-xl font-bold text-green-950 mb-2">{title}</h3>

            <p className="text-gray-700 mb-6">{description}</p>

            <a href="/menus" className="text-green-950 font-semibold hover:underline">View Menu </a>


        </div>

    );
}