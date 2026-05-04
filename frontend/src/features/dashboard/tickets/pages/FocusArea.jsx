import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import SideNav from '../../../../shared/layout/SideNav';
import { useTickets } from '../hooks/useTickets';
import { SkeletonWrapper, Skeleton } from '../../../../shared/components/ui/SkeletonWrapper';
import { DeleteConfirmModal } from '../../../../shared/components/ui/DeleteConfirmModal';
import { 
    Tag, Send, Trash2, ChevronRight, SkipForward, AlertCircle, 
    CheckCircle2, Clock, User, Mail, Calendar, MessageSquare,
    AlertTriangle, ArrowUpCircle, Info
} from 'lucide-react';

import FocusHeader from '../components/FocusHeader';
import FocusEmptyState from '../components/FocusEmptyState';
import TicketDetailsCard from '../components/TicketDetailsCard';
import ResolutionArea from '../components/ResolutionArea';
import TicketSidebar from '../components/TicketSidebar';

const FocusArea = () => {
    const { tickets, loading, resolveTicket, deleteTicket, updateTicket } = useTickets();
    const [activeTicketId, setActiveTicketId] = useState(null);
    const [response, setResponse] = useState('');
    const [subject, setSubject] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isResolving, setIsResolving] = useState(false);
    const [trainAi, setTrainAi] = useState(true);

    // Filter only open tickets and sort them by priority
    const openTickets = tickets
        .filter(t => t.status === 'open')
        .sort((a, b) => {
            const priorityMap = { high: 0, medium: 1, low: 2 };
            return priorityMap[a.priority] - priorityMap[b.priority];
        });

    useEffect(() => {
        if (!activeTicketId && openTickets.length > 0) {
            setActiveTicketId(openTickets[0]._id);
        }
    }, [openTickets, activeTicketId]);

    const currentTicket = openTickets.find(t => t._id === activeTicketId) || openTickets[0];

    useEffect(() => {
        if (currentTicket) {
            setSubject(`Resolution for your inquiry: #${currentTicket._id.slice(-6).toUpperCase()}`);
        }
    }, [currentTicket]);

    const currentIndex = openTickets.findIndex(t => t._id === (currentTicket?._id));

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % openTickets.length;
        setActiveTicketId(openTickets[nextIndex]._id);
        setResponse('');
    };

    const handlePrev = () => {
        const prevIndex = (currentIndex - 1 + openTickets.length) % openTickets.length;
        setActiveTicketId(openTickets[prevIndex]._id);
        setResponse('');
    };

    const handleResolve = async () => {
        if (!response.trim()) return;
        setIsResolving(true);
        try {
            await resolveTicket(currentTicket._id, { 
                response: response,
                subject: subject,
                trainAi: trainAi
            });
            setResponse('');
            // Move to next available ticket ID
            const nextTicket = openTickets.find(t => t._id !== activeTicketId);
            setActiveTicketId(nextTicket?._id || null);
        } finally {
            setIsResolving(false);
        }
    };

    const handleDelete = async () => {
        await deleteTicket(currentTicket._id);
        setIsDeleteModalOpen(false);
        const nextTicket = openTickets.find(t => t._id !== activeTicketId);
        setActiveTicketId(nextTicket?._id || null);
    };

    const handlePriorityChange = async (priority) => {
        await updateTicket(currentTicket._id, { priority });
    };

    if (loading && !openTickets.length) {
        return (
            <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
                <SideNav />
                <main className="flex-1 flex flex-col min-w-0">
                    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center px-8">
                        <Skeleton width={150} height={20} />
                    </header>
                    <div className="flex-1 p-8">
                        <SkeletonWrapper>
                            <div className="max-w-4xl mx-auto space-y-6">
                                <Skeleton height={200} />
                                <Skeleton height={300} />
                            </div>
                        </SkeletonWrapper>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
            <SideNav />

            <main className="flex-1 flex flex-col min-w-0 bg-surface/5">
                <FocusHeader 
                    openTicketsLength={openTickets.length} 
                    handleNext={handleNext} 
                    handlePrev={handlePrev}
                />

                <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {!currentTicket ? (
                            <FocusEmptyState />
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {/* Ticket Details Main Card */}
                                <div className="lg:col-span-2 space-y-6">
                                    <TicketDetailsCard currentTicket={currentTicket} />

                                    {/* Resolution Area */}
                                    <ResolutionArea 
                                        subject={subject}
                                        setSubject={setSubject}
                                        response={response}
                                        setResponse={setResponse}
                                        trainAi={trainAi}
                                        setTrainAi={setTrainAi}
                                        handleResolve={handleResolve}
                                        isResolving={isResolving}
                                    />
                                </div>

                                {/* Sidebar Options */}
                                <TicketSidebar 
                                    currentTicket={currentTicket}
                                    handlePriorityChange={handlePriorityChange}
                                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <DeleteConfirmModal 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Delete Ticket"
                itemName="this ticket"
                message="This action cannot be undone and will permanently remove this inquiry from your records."
            />
        </div>
    );
};

export default FocusArea;
