import React from "react";
import Button from "../../../components/UI/Button/Button";
import { Post } from "../../../models/Post";
import ProfilePostGrid from "./ProfilePostGrid";

const index: React.FC<{ posts: Post[]; saved: Post[] }> = ({
    posts,
    saved,
}) => {
    const [activeTab, setActiveTab] = React.useState<"posts" | "saved">(
        "posts"
    );

    const onTabChange = (tabId: "posts" | "saved") => {
        setActiveTab(tabId);
    };

    const tabs = [
        { id: "posts" as const, label: "POSTS" },
        { id: "saved" as const, label: "SAVED" },
    ];
    return (
        <div className="mt-16">
            <div className="border-t border-gray-400 dark:border-textGray text-white text-xs">
                <div className="flex justify-center gap-8">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;

                        return (
                            <Button
                                key={tab.id}
                                className={`py-2 rounded-none border-t-2 transition-colors ${
                                    isActive
                                        ? "border-t-white"
                                        : "border-transparent"
                                }`}
                                onClick={() => onTabChange(tab.id)}
                                content={tab.label}
                            />
                        );
                    })}
                </div>
            </div>
            {activeTab === "posts" && <ProfilePostGrid posts={posts} />}
            {activeTab === "saved" && <ProfilePostGrid posts={saved} />}
        </div>
    );
};

export default index;
