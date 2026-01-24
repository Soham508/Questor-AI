"use client";

import { useState } from "react";
import {
    PanelLeftClose,
    PanelLeft,
    Plus,
    Search,
    Paperclip,
    Link2,
    FileText,
    Image as ImageIcon,
    File,
    Clock,
    Trash2,
    MoreHorizontal,
    Sparkles,
    ArrowRight,
    X,
} from "lucide-react";

// Dummy data for topics
const dummyTopics = [
    {
        id: "1",
        title: "Climate Change Impact on Agriculture",
        createdAt: new Date("2024-01-15"),
        lastUpdated: new Date("2024-01-16"),
    },
    {
        id: "2",
        title: "AI in Healthcare: Current Trends",
        createdAt: new Date("2024-01-14"),
        lastUpdated: new Date("2024-01-14"),
    },
    {
        id: "3",
        title: "Cryptocurrency Market Analysis 2024",
        createdAt: new Date("2024-01-12"),
        lastUpdated: new Date("2024-01-13"),
    },
    {
        id: "4",
        title: "Space Exploration: Mars Mission Updates",
        createdAt: new Date("2024-01-10"),
        lastUpdated: new Date("2024-01-11"),
    },
    {
        id: "5",
        title: "Renewable Energy Sources Comparison",
        createdAt: new Date("2024-01-08"),
        lastUpdated: new Date("2024-01-09"),
    },
];

interface Topic {
    id: string;
    title: string;
    createdAt: Date;
    lastUpdated: Date;
}

interface AttachedFile {
    id: string;
    name: string;
    type: "pdf" | "image" | "doc" | "other";
    size: string;
}

interface AttachedLink {
    id: string;
    url: string;
}

export default function ResearchPage() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
    const [topics, setTopics] = useState<Topic[]>(dummyTopics);
    const [searchQuery, setSearchQuery] = useState("");
    const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
    const [attachedLinks, setAttachedLinks] = useState<AttachedLink[]>([]);
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [linkInput, setLinkInput] = useState("");

    const handleNewTopic = () => {
        setSelectedTopic(null);
        setSearchQuery("");
        setAttachedFiles([]);
        setAttachedLinks([]);
    };

    const handleSelectTopic = (topic: Topic) => {
        setSelectedTopic(topic);
        setSearchQuery("");
        setAttachedFiles([]);
        setAttachedLinks([]);
    };

    const handleDeleteTopic = (topicId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setTopics(topics.filter((t) => t.id !== topicId));
        if (selectedTopic?.id === topicId) {
            setSelectedTopic(null);
        }
    };

    const handleFileAttach = () => {
        // Simulate file attachment
        const mockFile: AttachedFile = {
            id: Date.now().toString(),
            name: `document_${attachedFiles.length + 1}.pdf`,
            type: "pdf",
            size: "2.4 MB",
        };
        setAttachedFiles([...attachedFiles, mockFile]);
    };

    const handleAddLink = () => {
        if (linkInput.trim()) {
            setAttachedLinks([
                ...attachedLinks,
                { id: Date.now().toString(), url: linkInput },
            ]);
            setLinkInput("");
            setShowLinkInput(false);
        }
    };

    const removeFile = (fileId: string) => {
        setAttachedFiles(attachedFiles.filter((f) => f.id !== fileId));
    };

    const removeLink = (linkId: string) => {
        setAttachedLinks(attachedLinks.filter((l) => l.id !== linkId));
    };

    const getFileIcon = (type: AttachedFile["type"]) => {
        switch (type) {
            case "pdf":
                return <FileText className="w-4 h-4 text-red-400" />;
            case "image":
                return <ImageIcon className="w-4 h-4 text-green-400" />;
            case "doc":
                return <File className="w-4 h-4 text-blue-400" />;
            default:
                return <File className="w-4 h-4 text-zinc-400" />;
        }
    };

    const formatDate = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) return "Today";
        if (days === 1) return "Yesterday";
        if (days < 7) return `${days} days ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="min-h-screen bg-black text-white flex pt-16">
            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-20 h-[calc(100vh-4rem)] z-40 transition-all duration-300 ease-out
          ${sidebarOpen ? "w-80" : "w-0"} overflow-hidden`}
            >
                <div className="h-full w-80 bg-zinc-900/50 backdrop-blur-xl border-r border-white/10 flex flex-col">
                    {/* Sidebar Header */}
                    <div className="p-4 border-b border-white/10">
                        <button
                            onClick={handleNewTopic}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 
                bg-linear-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold
                hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-[1.02]"
                        >
                            <Plus className="w-5 h-5" />
                            New Topic
                        </button>
                    </div>

                    {/* Topics List */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-1">
                        <div className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                            Recent Topics
                        </div>
                        {topics.map((topic) => (
                            <div
                                key={topic.id}
                                onClick={() => handleSelectTopic(topic)}
                                className={`group relative px-3 py-3 rounded-xl cursor-pointer transition-all duration-200
                  ${selectedTopic?.id === topic.id
                                        ? "bg-white/10 border border-white/10"
                                        : "hover:bg-white/5 border border-transparent"
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div
                                        className={`p-2 rounded-lg ${selectedTopic?.id === topic.id
                                            ? "bg-blue-500/20"
                                            : "bg-zinc-800/50"
                                            }`}
                                    >
                                        <Search
                                            className={`w-4 h-4 ${selectedTopic?.id === topic.id
                                                ? "text-blue-400"
                                                : "text-zinc-500"
                                                }`}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-zinc-200 truncate">
                                            {topic.title}
                                        </p>
                                        <div className="flex items-center gap-1 mt-1 text-xs text-zinc-500">
                                            <Clock className="w-3 h-3" />
                                            {formatDate(topic.lastUpdated)}
                                        </div>
                                    </div>
                                    {/* Delete button on hover */}
                                    <button
                                        onClick={(e) => handleDeleteTopic(topic.id, e)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg
                    opacity-0 group-hover:opacity-100 hover:bg-red-500/20 text-zinc-500 hover:text-red-400
                    transition-all duration-200"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>


                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Sidebar Toggle Button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`fixed top-30 z-50 p-2 rounded-r-lg bg-zinc-900/80 backdrop-blur-sm border border-white/10 border-l-0
          text-zinc-400 hover:text-white transition-all duration-300
          ${sidebarOpen ? "left-72" : "left-0"}`}
            >
                {sidebarOpen ? (
                    <PanelLeftClose className="w-5 h-5" />
                ) : (
                    <PanelLeft className="w-5 h-5" />
                )}
            </button>

            {/* Main Content */}
            <main
                className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-72" : "ml-0"
                    }`}
            >
                <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 py-12">
                    {/* Header */}
                    <div className="text-center mb-12">
                        {selectedTopic ? (
                            <>
                                <h1 className="text-3xl font-bold mb-2">
                                    {selectedTopic.title}
                                </h1>
                                <p className="text-zinc-500">
                                    Continue your research or start a new query
                                </p>
                            </>
                        ) : (
                            <>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 mb-6">
                                    <Sparkles className="w-4 h-4 text-cyan-400" />
                                    <span className="text-sm font-medium text-cyan-400">
                                        AI-Powered Research
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                    What would you like to
                                    <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                        research today?
                                    </span>
                                </h1>
                                <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                                    Enter your query below. Attach files or links for more
                                    comprehensive research.
                                </p>
                            </>
                        )}
                    </div>

                    {/* Search Container */}
                    <div className="w-full max-w-3xl">
                        {/* Main Search Box */}
                        <div
                            className="relative bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-white/10 
              shadow-2xl shadow-black/50 overflow-hidden transition-all duration-300
              focus-within:border-blue-500/50 focus-within:shadow-blue-500/10"
                        >
                            {/* Attachments Preview */}
                            {(attachedFiles.length > 0 || attachedLinks.length > 0) && (
                                <div className="p-4 border-b border-white/10 space-y-2">
                                    {/* Files */}
                                    {attachedFiles.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {attachedFiles.map((file) => (
                                                <div
                                                    key={file.id}
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 rounded-lg text-sm"
                                                >
                                                    {getFileIcon(file.type)}
                                                    <span className="text-zinc-300">{file.name}</span>
                                                    <span className="text-zinc-500 text-xs">
                                                        {file.size}
                                                    </span>
                                                    <button
                                                        onClick={() => removeFile(file.id)}
                                                        className="ml-1 p-0.5 hover:bg-zinc-700 rounded transition-colors"
                                                    >
                                                        <X className="w-3 h-3 text-zinc-500 hover:text-zinc-300" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Links */}
                                    {attachedLinks.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {attachedLinks.map((link) => (
                                                <div
                                                    key={link.id}
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm"
                                                >
                                                    <Link2 className="w-4 h-4 text-blue-400" />
                                                    <span className="text-blue-300 truncate max-w-[200px]">
                                                        {link.url}
                                                    </span>
                                                    <button
                                                        onClick={() => removeLink(link.id)}
                                                        className="ml-1 p-0.5 hover:bg-blue-500/20 rounded transition-colors"
                                                    >
                                                        <X className="w-3 h-3 text-blue-400" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Link Input */}
                            {showLinkInput && (
                                <div className="p-4 border-b border-white/10 flex items-center gap-2">
                                    <Link2 className="w-5 h-5 text-zinc-500" />
                                    <input
                                        type="url"
                                        value={linkInput}
                                        onChange={(e) => setLinkInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleAddLink()}
                                        placeholder="Paste URL and press Enter..."
                                        className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none text-sm"
                                        autoFocus
                                    />
                                    <button
                                        onClick={() => setShowLinkInput(false)}
                                        className="p-1 hover:bg-zinc-800 rounded transition-colors"
                                    >
                                        <X className="w-4 h-4 text-zinc-500" />
                                    </button>
                                </div>
                            )}

                            {/* Text Input */}
                            <div className="p-4">
                                <textarea
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Describe your research topic in detail..."
                                    rows={4}
                                    className="w-full bg-transparent text-white placeholder-zinc-500 outline-none resize-none text-lg"
                                />
                            </div>

                            {/* Action Bar */}
                            <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={handleFileAttach}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                                        title="Attach files"
                                    >
                                        <Paperclip className="w-5 h-5" />
                                        <span className="text-sm hidden sm:inline">Attach</span>
                                    </button>
                                    <button
                                        onClick={() => setShowLinkInput(true)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                                        title="Add link"
                                    >
                                        <Link2 className="w-5 h-5" />
                                        <span className="text-sm hidden sm:inline">Add Link</span>
                                    </button>
                                </div>

                                <button
                                    disabled={!searchQuery.trim()}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold
                    hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-[1.02]
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                                >
                                    <span>Research</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Quick Tips */}
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                {
                                    icon: <FileText className="w-5 h-5" />,
                                    text: "Upload PDFs for context",
                                },
                                {
                                    icon: <Link2 className="w-5 h-5" />,
                                    text: "Add URLs for specific sources",
                                },
                                {
                                    icon: <Search className="w-5 h-5" />,
                                    text: "Be detailed for better results",
                                },
                            ].map((tip, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900/30 border border-white/5 text-zinc-500"
                                >
                                    {tip.icon}
                                    <span className="text-sm">{tip.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
