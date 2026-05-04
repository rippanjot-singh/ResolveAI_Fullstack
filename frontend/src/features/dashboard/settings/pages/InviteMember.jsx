import React, { useState } from 'react';
import { createInviteToken } from '../services/settings.api';

// Extracted Components
                    import InviteHeader from '../components/InviteHeader';
                    import InviteForm from '../components/InviteForm';
                    import InviteResult from '../components/InviteResult';

const InviteMember = () => {
    const [role, setRole] = useState('member');
    const [speciality, setSpeciality] = useState('');
    const [loading, setLoading] = useState(false);
    const [inviteUrl, setInviteUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError('');
        setInviteUrl('');
        
        try {
            const data = await createInviteToken({ role, speciality });
            setInviteUrl(data.inviteTokenUrl);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to generate invite link');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-10 pb-20">
            <InviteHeader />

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">
                <div className="space-y-8">
                    <InviteForm 
                        role={role}
                        setRole={setRole}
                        speciality={speciality}
                        setSpeciality={setSpeciality}
                        loading={loading}
                        error={error}
                        onSubmit={handleGenerate}
                    />

                    <InviteResult 
                        inviteUrl={inviteUrl}
                        copied={copied}
                        copyToClipboard={copyToClipboard}
                    />
                </div>
            </div>
        </div>
    );
};

export default InviteMember;
