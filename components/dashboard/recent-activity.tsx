import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
    action: "signed in",
    time: "2 minutes ago",
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
    },
    action: "updated their profile",
    time: "1 hour ago",
  },
  {
    id: 3,
    user: {
      name: "Robert Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "RJ",
    },
    action: "created a new project",
    time: "3 hours ago",
  },
  {
    id: 4,
    user: {
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ED",
    },
    action: "completed a task",
    time: "5 hours ago",
  },
  {
    id: 5,
    user: {
      name: "Michael Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MW",
    },
    action: "added a new comment",
    time: "1 day ago",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.user.name} {activity.action}
            </p>
            <p className="text-sm text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

